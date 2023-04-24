// Takes an object which was parsed from a JSON string
// and checks whether it matches our quiz schema
function validateJson(jsonObject, schema) {
    const Ajv = require("ajv")
    const ajv = new Ajv()
    const validate = ajv.compile(schema)
    return validate(jsonObject)
}

module.exports = { validateJson } 

// const quiz = {
//     "questions": [
//         {
//         "question": "What is the name of the Simpsons' next-door neighbor?",
//         "options": [
//             {"answer": "Moe", "correct": false},
//             {"answer": "Ned", "correct": true},
//             {"answer": "Lenny", "correct": false},
//             {"answer": "Carl", "correct": false}
//         ]
//         },
//         {
//         "question": "What is the name of Bart's best friend?",
//         "options": [
//             {"answer": "Milhouse", "correct": true},
//             {"answer": "Nelson", "correct": false},
//             {"answer": "Martin", "correct": false},
//             {"answer": "Ralph", "correct": false}
//         ]
//         },
//     ]
// }

// This schema uses the 'JSON Schema' which is used by Ajv
// https://ajv.js.org/guide/getting-started.html
// It checks that the JSON object has the right structure and properties
// Will return false if anything doesn't match up, or if we get extra properties
// As well as using this to validate the responses we get
// We can also pass this to chatGPT so it knows what format we want

// const quizSchema = {
//     type: "object",
//     properties: {
//       questions: {
//         type: "array",
//         items: {
//           type: "object",
//           properties: {
//             question: 
//                 {type: "string"},
//             options: {
//                 type: "array",
//                 items: {
//                     type: "object",
//                     properties: {
//                         answer: {type: "string"},
//                         correct: {type: "boolean"}
//                     },
//                     required: ["answer", "correct"],
//                     additionalProperties: false 
//                 }
//             }
//           },
//           required: ["question", "options"],
//           additionalProperties: false 
//         }
//       }
//     },
//     required: ["questions"],
//     additionalProperties: false 
// }

// console.log(validateJson(quiz, quizSchema))
