import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(express.static("public"))


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/public/index.html")
})


app.post("/ask", async (req, res) => {
    try {
        const question = req.body.question

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required"
            })
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: question
        })

        res.status(200).json({
            success: true,
            answer: response.text
        })

    } catch (err) {
        console.error("Gemini Error:", err.message)

        res.status(500).json({
            success: false,
            message: "Something went wrong on the server"
        })
    }
})

app.listen(3000, () => {
    console.log("Server started on port 3000")
})