package com.seb_pre_007.Server.vaildator;

import org.springframework.util.StringUtils;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.annotation.Annotation;


public class NotSpaceValidator implements ConstraintValidator<NotSpace, String> {


    @Override
    public void initialize(NotSpace constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value==null || StringUtils.hasText(value);
    }
}
