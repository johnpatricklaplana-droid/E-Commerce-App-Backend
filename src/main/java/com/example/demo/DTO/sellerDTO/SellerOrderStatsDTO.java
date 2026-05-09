package com.example.demo.DTO.sellerDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerOrderStatsDTO {
    
    private String ordersPercentageCompareToLastTime;
    private String pendingOrdersPercentageCompareToLastTime;
    private String paidOrdersCompareToLastTime;
    private String revenueCompareToLastTime;
    private String ordersReturnComparedToLastTime;

}
