# Image-Based Questions

This document explains how to write image-based questions in Edutive Open Learning Toolkit.

Image-based questions are questions that need a visual element, such as a diagram, chart, table, map, graph, screenshot, or geometry figure.

The dataset uses the optional `image_url` field to reference the image.

## When to Use `image_url`

Use `image_url` when the question cannot be answered clearly without an image.

Good use cases:

- geometry diagrams,
- graphs,
- charts,
- tables,
- maps,
- science illustrations,
- screenshots,
- reading comprehension images,
- visual pattern questions.

Do not use `image_url` when the image is only decorative.

If the question can be fully understood without an image, keep:

```json
"image_url": null
```

## Basic Rule

An image-based question should still include enough context in the `question` text.

Weak question:

```text
What is the answer based on the image?
```

Better question:

```text
The image shows a triangle with base 10 cm and height 6 cm. What is its area?
```

The better version gives the learner and future tools more context.

## JSON Example

```json
{
  "id": "MTK-GEO-001",
  "subject": "Mathematics",
  "topic": "Geometry",
  "subtopic": "Triangle Area",
  "difficulty": "medium",
  "cognitive_level": "application",
  "question": "The image shows a triangle with base 10 cm and height 6 cm. What is its area?",
  "options": {
    "A": "16 cm^2",
    "B": "30 cm^2",
    "C": "60 cm^2",
    "D": "120 cm^2"
  },
  "answer_key": "B",
  "explanation": "Use the triangle area formula: 1/2 x base x height = 1/2 x 10 x 6 = 30 cm^2.",
  "common_misconception": "Students may forget to multiply by 1/2 and choose 60 cm^2.",
  "tags": ["geometry", "triangle", "area", "image-based"],
  "image_url": "https://example.com/images/triangle-area-001.png"
}
```

## CSV Example

```csv
id,subject,topic,subtopic,difficulty,cognitive_level,question,option_a,option_b,option_c,option_d,answer_key,explanation,common_misconception,tags,image_url
MTK-GEO-001,Mathematics,Geometry,Triangle Area,medium,application,"The image shows a triangle with base 10 cm and height 6 cm. What is its area?","16 cm^2","30 cm^2","60 cm^2","120 cm^2",B,"Use the triangle area formula: 1/2 x base x height = 1/2 x 10 x 6 = 30 cm^2.","Students may forget to multiply by 1/2 and choose 60 cm^2.","geometry,triangle,area,image-based","https://example.com/images/triangle-area-001.png"
```

## Writing Clear Image-Based Questions

When writing an image-based question:

- describe the important visual information in the question text,
- avoid vague phrases like "look at the image",
- mention important labels, values, or objects,
- make sure the correct answer depends on the intended visual information,
- keep the explanation clear even for someone reviewing the data later.

Example:

```text
The image shows a bar chart of student reading time from Monday to Friday. Which day has the highest reading time?
```

This is clearer than:

```text
Which one is highest?
```

## Image Reference Guidelines

Images should be referenced with stable and accessible URLs.

Recommended:

```text
https://example.com/images/triangle-area-001.png
```

Avoid:

```text
C:\Users\Student\Downloads\image.png
```

Avoid local file paths because other contributors, CI, and future applications cannot access them.

For future repository-hosted images, use a consistent naming pattern.

Recommended naming pattern:

```text
subject-topic-short-description-number.png
```

Examples:

```text
mathematics-geometry-triangle-area-001.png
science-ecosystem-food-chain-001.png
english-reading-picture-description-001.png
```

## Accessibility and Context Notes

For now, the schema does not have a separate `image_alt` field.

Because of that, contributors should include the most important visual context in the `question` field.

Good:

```text
The image shows a line graph where the x-axis is time and the y-axis is distance. The line rises steadily from 0 km to 10 km in 2 hours. What does the graph show?
```

Weak:

```text
What does the graph show?
```

The clearer version helps:

- learners,
- teachers,
- reviewers,
- future AI diagnostic tools,
- and accessibility workflows.

## Common Mistakes

Avoid these mistakes:

- using an image that is only decorative,
- using a broken or private image URL,
- using a local file path,
- writing a question that cannot be understood without any context,
- forgetting to include `image_url`,
- using copyrighted images without permission,
- using images with unclear labels or unreadable text.

## Contributor Checklist

Before submitting an image-based question, check:

- [ ] The question really needs an image.
- [ ] The `image_url` field is filled with a stable URL.
- [ ] The image URL is not a local file path.
- [ ] The question text describes the important visual context.
- [ ] The options are clear and related to the image.
- [ ] The explanation refers to the visual information.
- [ ] The `common_misconception` explains a likely visual or reasoning mistake.
- [ ] The tags include `image-based`.
- [ ] The question follows the normal dataset format.
- [ ] The dataset passes validation.

## Validation

Validate JSON samples:

```bash
npm run validate:sample:json
```

Validate CSV samples:

```bash
npm run validate:sample:csv
```

Run tests:

```bash
npm test
```

## Future Improvements

Possible future improvements:

- add `image_alt`,
- add local image asset examples,
- add image URL validation,
- add repository-hosted image examples,
- add OCR or vision-based checks.

These are not part of the current issue.
