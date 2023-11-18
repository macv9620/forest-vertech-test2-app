package com.vertech.forest.web.controller;

import com.vertech.forest.persistence.entity.SpecieInfoEntity;
import com.vertech.forest.service.SpecieInfoService;
import com.vertech.forest.web.controller.wrapper.ResponseWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/species")
public class SpecieInfoController {
    private final SpecieInfoService specieInfoService;

    public SpecieInfoController(SpecieInfoService specieInfoService) {
        this.specieInfoService = specieInfoService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<ResponseWrapper<?>> getSpecies(){
        String message;
        List<SpecieInfoEntity> data;
        HttpStatus httpStatus;

        try {
            data = specieInfoService.getAllSpecies();
            message = data.size() + " species found";
            httpStatus = HttpStatus.OK;
        } catch (Exception e){
            data = null;
            message = e.getMessage();
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        ResponseWrapper<List<SpecieInfoEntity>> responseWrapper = new ResponseWrapper<>(
                message,
                data
        );

        return new ResponseEntity<>(responseWrapper, httpStatus);
    }
}
