package com.fastma.fastma.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;

import java.util.Map;

public class JsonUtil {
    public static String success(String msg) {
        JSONObject json = new JSONObject();
        json.put("success", true);
        json.put("code", 200);
        json.put("msg", msg);

        return json.toJSONString();
    }

    public static String success(String msg, Object rs) {
        JSONObject json = new JSONObject();
        json.put("success", true);
        json.put("code", 200);
        json.put("msg", msg);
        json.put("rs", rs);

        return json.toJSONString();
    }

    public static String failure(String msg) {
        JSONObject json = new JSONObject();
        json.put("success", false);
        json.put("code", 500);
        json.put("msg", msg);

        return json.toJSONString();
    }

    public static String failure(String msg, int errCode) {
        JSONObject json = new JSONObject();
        json.put("success", false);
        json.put("code", errCode);
        json.put("msg", msg);

        return json.toJSONString();
    }

    public static Map json2Map(String json) {
        return JSONObject.parseObject(json, Map.class);
    }

    public static String object2JsonStr(Object o) {
        return JSON.toJSONString(o);
    }

    public static <T>T json2Object(String jsonStr, Class<T> c) {
        return JSON.parseObject(jsonStr, c);
    }

    public static JSONObject str2Json(String jsonStr) {
        return JSON.parseObject(jsonStr);
    }
}
