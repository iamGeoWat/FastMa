package com.fastma.fastma.controller;

import com.fastma.fastma.entity.Betorder;
import com.fastma.fastma.service.OrderService;
import com.fastma.fastma.util.JsonUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class OrderController {

    @Autowired
    OrderService orderService;

    @RequestMapping(method = RequestMethod.GET, value = "/order")
    public String getOrder(@RequestParam("id") int id) {
        Betorder betorder = orderService.getOrderById(id);

        if (betorder != null)
            return JsonUtil.success("query success", betorder);
        else
            return JsonUtil.failure("order not found");
    }

    @RequestMapping(method = RequestMethod.POST, value = "/order")
    public String createOrder(@RequestBody Betorder betorder) {
        return orderService.insertOrder(betorder);
    }
}
