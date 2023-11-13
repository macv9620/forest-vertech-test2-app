package com.vertech.forest.web.controller;

import com.vertech.forest.persistence.entity.QueryEntity;
import com.vertech.forest.persistence.entity.UserEntity;
import com.vertech.forest.service.QueryService;
import com.vertech.forest.web.controller.exceptions.CheckDataCustomException;
import com.vertech.forest.web.controller.utils.ValidateSaveQueryInfo;
import com.vertech.forest.web.controller.wrapper.ResponseWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userQuery")
public class QueryController {
    private final QueryService queryService;

    public QueryController(QueryService queryService) {
        this.queryService = queryService;
    }

    @PostMapping("/save")
    public ResponseEntity<ResponseWrapper<?>> postQuery(@RequestBody QueryEntity queryEntity){

        String message;
        QueryEntity data;
        HttpStatus httpStatus;

        try {
            ValidateSaveQueryInfo.check(queryEntity);
            data = queryService.saveQuery(queryEntity);
            message = "Query saved successfully";
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
        }

        ResponseWrapper<QueryEntity> responseWrapper = new ResponseWrapper<>(
                message,
                data
        );

        return new ResponseEntity<>(responseWrapper, httpStatus);
    }

    @GetMapping ("/getAll")
    public ResponseEntity<ResponseWrapper<?>> getAll(){

        String message;
        List<QueryEntity> data;
        HttpStatus httpStatus;

        try {
            data = queryService.getAll();
            message = data.size() + " Queries found";
            httpStatus = HttpStatus.OK;
        } catch (Exception e){
            data = null;
            message = e.getMessage();
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        ResponseWrapper<List<QueryEntity>> responseWrapper = new ResponseWrapper<>(
                message,
                data
        );

        return new ResponseEntity<>(responseWrapper, httpStatus);
    }
}
