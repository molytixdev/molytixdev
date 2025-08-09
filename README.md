# MolytixDev – MVP v1.0

## Table of Contents

1. [Overview](#overview)
2. [Scope – MVP Features](#scope--mvp-features)
3. [System Overview (Tech Stack)](#system-overview)
4. [Functional Requirements](#functional-requirements)
5. [Non-Functional Requirements](#non-functional-requirements)
6. [Data Flow](#data-flow)
7. [Dependencies](#dependencies)
8. [Timeline – 3 Weeks](#timeline)
9. [Future Enhancements](#future-enhancements)
10. [Diagrams](#diagrams)
    - [Class Diagram](#class-diagram)
    - [Use Case Diagram](#use-case-diagram)
11. [Installation](#installation)
12. [Screenshots](#screenshots)

---

## Overview

Molytix Panel is a web-based platform for managing client projects, meetings, and communications in one place.

The **MVP** enables hosting meetings directly in the platform, generating AI-powered transcripts, extracting functional/non-functional requirements,
and providing actionable “next step” recommendations.

---

## Scope – MVP Features

- Multi-project management
- Add/remove users to projects
- Web-based meeting hosting (via Stream API)
- Automatic meeting transcription (OpenAI API)
- AI summary & requirement extraction
- Role-based access (Owner, Team Member, Client/Stakeholder)

---

## System Overview (Tech Stack)

- **Type:** Web application (responsive for all browsers)
- **Frontend:** Next.js + shadcn/ui + tRCP
- **Backend:** Express + Drizzle ORM + tRCP
- **Database:** PostgreSQL (NeonDB)
- **Auth:** Better Auth
- **Video:** WebRTC via Stream API
- **AI Processing:** OpenAI API
- **Background Jobs:** Inngest
- **Hosting:** Vercel

---

## Functional Requirements

1. **Project Management**
    - Create/edit/delete projects
    - Assign/remove members to projects
    - Role-based permissions for access control
2. **Meeting Management**
    - Schedule and host meetings within a project
    - Join meetings via browser
    - Record meeting video/audio
3. **AI Features**
    - Transcribe meeting audio using OpenAI API
    - Generate AI-powered meeting summaries
    - Extract functional & non-functional requirements from transcripts
    - Suggest next steps for projects
4. **Data Access**
    - Store transcripts, summaries, and AI outputs securely in DB
    - Display meeting history and related outputs to authorized users

---

## Non-Functional Requirements

1. MVP deployed within **3 weeks** from project start
2. Max **5 concurrent meetings** in MVP
3. Up to **10 active participants per meeting**
4. GDPR-compliant storage for EU clients
5. Works in latest versions of Chrome, Firefox, Edge, Safari
6. Stable internet required for video conferencing
7. AI outputs reviewed manually before sharing in MVP

---

## Data Flow

1. Meeting starts → video/audio recorded via Stream API
2. Recording sent to OpenAI API for transcription
3. Transcript processed for:
    - Summary
    - Requirement extraction
    - Next-step suggestions
4. Results stored in DB and linked to the relevant project
5. Authorized users can view outputs anytime

---

## Dependencies

- OpenAI API (AI transcription & summaries)
- Stream API (WebRTC video calls)
- NeonDB PostgreSQL
- Better Auth (authentication & role management)
- Inngest (background jobs)
- Vercel

---

## Timeline

**Week 1** – Setup, auth, project management module, meeting UI (frontend)  
**Week 2** – Video calls, recording, transcription, AI summary  
**Week 3** – Requirement extraction, testing, bug fixes, deployment

---

## Future Enhancements

- Email/Slack notifications for meeting outputs
- Calendar integration (Google/Outlook)
- Task management boards
- Analytics dashboard
- Advanced AI (agenda creation, sentiment analysis)

---

## Diagrams

### Use Case Diagram

[Open in Eraser](https://app.eraser.io/workspace/cxc4Lx0KRptBS1zORVyj?elements=HXF9qkyMa66t36Xy6uiKrg)

### Class Diagram

![Class Diagram](./docs/class-diagram.png)

---

## Installation

For more info on technical aspects of the project reach [Techinical Readme](./TECHNICAL-README.md)

---

## Screenshots

![Cover](./public/cover.webp)
