package com.vertech.forest.web.controller;

import com.vertech.forest.service.BigQueryService;
import com.vertech.forest.web.controller.dto.queries.TreeCounterResult;
import com.vertech.forest.web.controller.dto.queries.UserQueryInfo;
import com.vertech.forest.web.controller.exceptions.CheckDataCustomException;
import com.vertech.forest.web.controller.utils.ValidateUserQueryInfo;
import com.vertech.forest.web.controller.wrapper.ResponseWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/query")
public class BigQueryController {
    // BigQueryService to handle BigQuery operations
    private final BigQueryService bigQueryService;

    public BigQueryController(BigQueryService bigQueryService) {
        this.bigQueryService = bigQueryService;
    }

    // Endpoint to execute a BigQuery based on user input
    @PostMapping ("/getData")
    public ResponseEntity<ResponseWrapper<?>> getQuery(@RequestBody UserQueryInfo userQueryInfo){
        System.out.println(userQueryInfo);
        String message;
        List<TreeCounterResult> data;
        HttpStatus httpStatus;

        try {
            // Validate the user input
            ValidateUserQueryInfo.check(userQueryInfo);
            message = "Query executed successfully";
            // Execute the BigQuery and retrieve the results
            data = bigQueryService.executeQuery(userQueryInfo);
            httpStatus = HttpStatus.OK;
        } catch (CheckDataCustomException ce){
            // Handle custom exceptions for validation errors
            message = ce.getMessage();
            data = null;
            httpStatus = HttpStatus.BAD_REQUEST;
            ce.printStackTrace();
        } catch (Exception e){
            // Handle unexpected errors
            message = "Unhandled error";
            data = null;
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            e.printStackTrace();
        }

        // Return the response with the appropriate status code and message
        return new ResponseEntity<>( new ResponseWrapper<>(
                message,
                data
        ), httpStatus);
    }
}