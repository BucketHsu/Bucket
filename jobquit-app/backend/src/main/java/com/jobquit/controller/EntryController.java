package com.jobquit.controller;

import com.jobquit.service.EntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.util.*;

@RestController
@RequestMapping("/api")
public class EntryController {

    @Autowired
    private EntryService entryService;

    @GetMapping("/init")
    public void init(@CookieValue(name = "X-USER-ID", required = false) String userId, HttpServletResponse response) {
        if (userId == null) {
            userId = UUID.randomUUID().toString();
            Cookie cookie = new Cookie("X-USER-ID", userId);
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            cookie.setMaxAge(60 * 60 * 24 * 365);
            response.addCookie(cookie);
        }
        entryService.initUser(userId);
    }

    @GetMapping("/entries")
    public List<Map<String, String>> getEntries(@CookieValue("X-USER-ID") String userId) {
        return entryService.getEntries(userId);
    }

    @PostMapping("/entries")
    public Map<String, Object> addEntry(@CookieValue("X-USER-ID") String userId, @RequestBody Map<String, String> body) {
        String reason = body.get("reason");
        return entryService.addEntry(userId, reason);
    }
}
