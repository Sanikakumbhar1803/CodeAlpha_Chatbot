from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


def get_bot_response(user_message):
    message = user_message.lower().strip()

    if message == "hello":
        return "👋 Hi! Welcome to CodeAlpha Chatbot."

    elif message == "hi":
        return "😊 Hello! How can I help you?"

    elif message == "how are you":
        return "🤖 I'm doing great! Thanks for asking."

    elif message == "what is your name":
        return "🤖 My name is CodeAlpha Bot."

    elif message == "bye":
        return "👋 Goodbye! Have a great day."

    else:
        return "❓ Sorry, I don't understand that. Try saying Hello or Bye."


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/get", methods=["POST"])
def chatbot():
    user_message = request.form["message"]
    reply = get_bot_response(user_message)
    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(debug=True)