import { Html, Head, Body, Container, Text } from "@react-email/components";

const ChatbotEmail = ({ userMessage }) => {
  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: "#f6f6f6", padding: "20px" }}>
        <Container
          style={{ backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px" }}
        >
          <Text style={{ fontSize: "20px", fontWeight: "bold" }}>Chatbot Response</Text>
          <Text>User's Message: "{userMessage}"</Text>
          <Text>Our team will respond to you shortly.</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ChatbotEmail;
