package com.vertech.forest.web.controller;

import com.vertech.forest.persistence.entity.QueryEntity;
import com.vertech.forest.service.QueryService;
import com.vertech.forest.web.controller.exceptions.CheckDataCustomException;
import com.vertech.forest.web.controller.utils.ValidateSaveQueryInfo;
import com.vertech.forest.web.controller.wrapper.ResponseWrapper;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/api/userQuery")
public class QueryController {
    private final QueryService queryService;

    public QueryController(QueryService queryService) {
        this.queryService = queryService;
    }

    @PostMapping("/save")
    public ResponseEntity<ResponseWrapper<?>> postQuery(
            @Valid @RequestBody QueryEntity queryEntity,
            BindingResult bindingResult){

        String message;
        QueryEntity data;
        HttpStatus httpStatus;

        try {
            if (bindingResult.hasErrors()) {
                StringBuilder errorBuilder = new StringBuilder();
                for (FieldError error : bindingResult.getFieldErrors()) {
                    errorBuilder.append(error.getField()).append(": ").append(error.getDefaultMessage()).append(" - ");
                }
                throw new RuntimeException(errorBuilder.toString());
            }
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

    @GetMapping("/getById/{queryId}")
    public ResponseEntity<ResponseWrapper<?>> getQueryById(@PathVariable int queryId) {

        String message;
        QueryEntity data;
        HttpStatus httpStatus;

        try {
            Optional<QueryEntity> queryOptional = queryService.getQueryById(queryId);

            if (queryOptional.isPresent()) {
                data = queryOptional.get();
                message = "Query found";
                httpStatus = HttpStatus.OK;
            } else {
                data = null;
                message = "Query not found";
                httpStatus = HttpStatus.BAD_REQUEST;
            }
        } catch (Exception e) {
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
}
