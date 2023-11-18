package com.vertech.forest.web.controller;

import com.vertech.forest.persistence.entity.StateInfoEntity;
import com.vertech.forest.service.StateInfoService;
import com.vertech.forest.web.controller.wrapper.ResponseWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/states")
public class StateInfoContoller {
    private final StateInfoService stateInfoService;

    public StateInfoContoller(StateInfoService stateInfoService) {
        this.stateInfoService = stateInfoService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<ResponseWrapper<?>> getStates(){
        String message;
        List<StateInfoEntity> data;
        HttpStatus httpStatus;

        try {
            data = stateInfoService.getAllStates();
            message = data.size() + " states found";
            httpStatus = HttpStatus.OK;
        } catch (Exception e){
            data = null;
            message = e.getMessage();
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        ResponseWrapper<List<StateInfoEntity>> responseWrapper = new ResponseWrapper<>(
                message,
                data
        );

        return new ResponseEntity<>(responseWrapper, httpStatus);
    }
}
