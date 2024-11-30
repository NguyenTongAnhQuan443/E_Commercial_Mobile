package vn.edu.iuh.fit.dto;

public class ChatbotRequestDto {

    private String question;

    // Constructor
    public ChatbotRequestDto() {}

    public ChatbotRequestDto(String question) {
        this.question = question;
    }

    // Getter và Setter
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}
