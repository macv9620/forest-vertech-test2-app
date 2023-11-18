package com.vertech.forest.web.controller;

import com.vertech.forest.persistence.entity.QueryCommentEntity;
import com.vertech.forest.service.QueryCommentService;
import com.vertech.forest.web.controller.exceptions.CheckDataCustomException;
import com.vertech.forest.web.controller.utils.ValidateSaveQueryCommentInfo;
import com.vertech.forest.web.controller.wrapper.ResponseWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userComment")
public class QueryCommentController {
    // Service to handle QueryCommentEntity operations
    private final QueryCommentService queryCommentService;

    public QueryCommentController(QueryCommentService queryCommentService) {
        this.queryCommentService = queryCommentService;
    }

    // Endpoint to save a QueryCommentEntity
    @PostMapping("/save")
    public ResponseEntity<ResponseWrapper<?>> save(@RequestBody QueryCommentEntity queryCommentEntity){
        String message;
        QueryCommentEntity data;
        HttpStatus httpStatus;

        try {
            // Validate the QueryCommentEntity
            ValidateSaveQueryCommentInfo.check(queryCommentEntity);
            // Save the QueryCommentEntity
            data = queryCommentService.save(queryCommentEntity);
            message = "Comment saved successfully";
            httpStatus = HttpStatus.CREATED;
        } catch (CheckDataCustomException ce){

            message = ce.getMessage();
            data = null;
            httpStatus = HttpStatus.BAD_REQUEST;
            ce.printStackTrace();
        } catch (Exception e){
            data = null;
            message = e.getMessage();
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            e.printStackTrace();
        }

        ResponseWrapper<QueryCommentEntity> responseWrapper = new ResponseWrapper<>(
                message,
                data
        );

        return new ResponseEntity<>(responseWrapper, httpStatus);
    }

    // Endpoint to retrieve all QueryCommentEntities
    @GetMapping("/getAll")
    public ResponseEntity<ResponseWrapper<?>> getAll(){
        String message;
        List<QueryCommentEntity> data;
        HttpStatus httpStatus;

        try {
            // Retrieve all QueryCommentEntities
            data = queryCommentService.getAll();
            message = data.size() + " Comments found";
            httpStatus = HttpStatus.OK;
        } catch (Exception e){
            // Handle unexpected errors
            data = null;
            message = e.getMessage();
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            e.printStackTrace();
        }

        // Return the response with the appropriate status code and message
        ResponseWrapper<List<QueryCommentEntity>> responseWrapper = new ResponseWrapper<>(
                message,
                data
        );

        return new ResponseEntity<>(responseWrapper, httpStatus);
    }
}