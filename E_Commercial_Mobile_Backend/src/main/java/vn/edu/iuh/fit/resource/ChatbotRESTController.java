package vn.edu.iuh.fit.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.service.impl.ProductServiceImpl;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotRESTController {

    private final ProductServiceImpl productServiceImpl;

    public ChatbotRESTController(ProductServiceImpl productServiceImpl) {
        this.productServiceImpl = productServiceImpl;
    }

    @PostMapping
    public ResponseEntity<String> getChatbotResponse(@RequestBody String message) {
        try {
            String response = productServiceImpl.chatbot(message);
            return ResponseEntity.ok(response); // Trả về câu trả lời từ chatbot
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Đã có lỗi xảy ra khi xử lý yêu cầu.");
        }
    }
}