/*
 * @ (#) Controller.java       1.0     04/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.controller;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 04/11/2024
 * @version:    1.0
 */

import com.google.api.client.util.Value;
import org.springframework.http.*;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import vn.edu.iuh.fit.entity.SocialUser;

import java.util.Map;


@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:8081")
public class AuthController {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String GOOGLE_CLIENT_ID;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String GOOGLE_CLIENT_SECRET;

    @Value("${spring.security.oauth2.client.registration.facebook.client-id}")
    private String FACEBOOK_CLIENT_ID;

    @Value("${spring.security.oauth2.client.registration.facebook.client-secret}")
    private String FACEBOOK_CLIENT_SECRET;

    @GetMapping("/login/google")
    public ResponseEntity<SocialUser> loginWithGoogle(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            // Handle the token from the header
            // The token is in the format "Bearer <token>"
            String token = null;
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                token = authorizationHeader.substring(7); // Bỏ đi "Bearer "
            }

            if (token == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(token);
            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            // Call Google API to get user information
            String userInfoEndpointUri = "https://www.googleapis.com/oauth2/v3/userinfo";
            ResponseEntity<SocialUser> response = restTemplate.exchange(
                    userInfoEndpointUri,
                    HttpMethod.GET,
                    entity,
                    SocialUser.class
            );

            SocialUser googleUser = response.getBody();

            return ResponseEntity.ok(googleUser);
        } catch (OAuth2AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/login/facebook")
    public ResponseEntity<SocialUser> loginWithFacebook(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = extractToken(authorizationHeader);
            if (token == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            RestTemplate restTemplate = new RestTemplate();
            String url = "https://graph.facebook.com/v21.0/me?fields=id,name,email,picture&access_token=" + token;

            ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                Map<String, Object> body = response.getBody();
                if (body != null) {
                    SocialUser user = new SocialUser();

                    // Get user information
                    user.setId((String) body.get("id"));
                    user.setName((String) body.get("name"));
                    user.setEmail((String) body.get("email"));

                    // Get user picture
                    Map<String, Object> picture = (Map<String, Object>) body.get("picture");
                    if (picture != null) {
                        Map<String, Object> pictureData = (Map<String, Object>) picture.get("data");
                        if (pictureData != null) {
                            user.setPicture((String) pictureData.get("url"));
                        }
                    }
                    return ResponseEntity.ok(user);
                }
            }

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private String extractToken(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }


}
