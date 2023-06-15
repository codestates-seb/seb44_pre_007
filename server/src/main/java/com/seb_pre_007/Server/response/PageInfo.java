package com.seb_pre_007.Server.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PageInfo {

    private int page;
    private int limit;
    private long totalElement;
    private int totalPages;

}
