package com.fastma.fastma.service;

import com.fastma.fastma.entity.Betorder;

import java.util.List;

public interface OrderService {

    List<Betorder> getAllOrders();

    Betorder getOrderById(int id);

    String insertOrder(Betorder order);
}
