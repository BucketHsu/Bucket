package com.jobquit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class EntryService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    private final ObjectMapper objectMapper = new ObjectMapper();

    public void initUser(String userId) {
        if (!redisTemplate.hasKey("user:" + userId)) {
            redisTemplate.opsForList().leftPush("user:" + userId, "[]");
            redisTemplate.opsForList().trim("user:" + userId, 1, 0); // 清空列表
        }
    }

    public List<Map<String, String>> getEntries(String userId) {
        List<String> rawList = redisTemplate.opsForList().range("user:" + userId, 0, -1);
        List<Map<String, String>> result = new ArrayList<>();
        for (String json : rawList) {
            try {
                result.add(objectMapper.readValue(json, Map.class));
            } catch (Exception ignored) {}
        }
        return result;
    }

    public Map<String, Object> addEntry(String userId, String reason) {
        Map<String, String> entry = new HashMap<>();
        entry.put("reason", reason);
        entry.put("timestamp", LocalDateTime.now().toString());
        try {
            String json = objectMapper.writeValueAsString(entry);
            redisTemplate.opsForList().rightPush("user:" + userId, json);
        } catch (Exception e) {
            throw new RuntimeException("Failed to store entry", e);
        }
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("entry", entry);
        return result;
    }
}
