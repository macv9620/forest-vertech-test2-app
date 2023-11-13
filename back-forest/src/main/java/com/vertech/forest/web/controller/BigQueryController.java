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
    private final BigQueryService bigQueryService;

    public BigQueryController(BigQueryService bigQueryService) {
        this.bigQueryService = bigQueryService;
    }

    @PostMapping ("/getData")
    public ResponseEntity<ResponseWrapper<?>> getQuery(@RequestBody UserQueryInfo userQueryInfo){
        System.out.println(userQueryInfo);
        String message;
        List<TreeCounterResult> data;
        HttpStatus httpStatus;

        try {
            ValidateUserQueryInfo.check(userQueryInfo);
            message = "Query excecuted successfully";
            data = bigQueryService.executeQuery(userQueryInfo);
            httpStatus = HttpStatus.OK;
        } catch (CheckDataCustomException ce){
            message = ce.getMessage();
            data = null;
            httpStatus = HttpStatus.BAD_REQUEST;
            ce.printStackTrace();
        } catch (Exception e){
            message = "Unhandled error";
            data = null;
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            e.printStackTrace();
        }

        return new ResponseEntity<>( new ResponseWrapper<>(
                message,
                data
        ), httpStatus);
    }
}
