# Event Management Platform - Frontend

![Next.js](https://img.shields.io/badge/Next.js-15.x-blue)
![React](https://img.shields.io/badge/React-19.x-61DAFB)
![Redux](https://img.shields.io/badge/Redux-Toolkit-764ABC)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0.5.x-000000)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-10.x-0055FF)
![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-010101)
![Next Themes](https://img.shields.io/badge/Next%20Themes-1.x-000000)

Welcome to the frontend of the **Event Management Platform**! This is a modern, responsive, and feature-rich calendar application built with **Next.js 15**, **React Redux**, **shadcn/ui**, and **Framer Motion**. It supports **dark/light mode** using **Next Themes** and integrates **Socket.IO** for real-time updates.

---

## Features

### Core Features
- **🎨 Fully Customizable UI**: Built with **shadcn/ui** and **Tailwind CSS** for a sleek and modern design.
- **🌓 Dark/Light Mode**: Seamless theme switching using **Next Themes**.
- **📱 Responsive Design**: Works flawlessly on all devices.
- **⚡ Real-Time Updates**: Integrated with **Socket.IO** for real-time event updates.
- **🎯 Accessible Components**: Built with accessibility in mind using **Radix UI**.

### Calendar Features
- **📅 Multiple View Modes**: Day, week, month, and agenda views.
- **📝 Event Management**:
    - Create, edit, and delete events.
    - Drag-and-drop support for rescheduling events.
    - Color-coded event categories.
- **🔍 Advanced Filtering**: Filter events by category, date, or status.
- **📊 Event Analytics**: Visualize event data with charts and graphs.

### Dialog Features
- **Create Event Dialog**:
    - 📝 Event title input.
    - 🕒 Date/time picker for event scheduling.
    - 🎨 Color picker for event categorization.
    - ✅ Form validation.
    - 🔄 Real-time preview.
- **Manage Event Dialog**:
    - ✏️ Edit existing events.
    - 🗑️ Delete events.
    - 🕒 Modify date/time.
    - 🎨 Update event color.
    - ⚡ Quick actions.

---

## Technologies Used

- **Frontend Framework**: Next.js 15
- **State Management**: React Redux (Redux Toolkit)
- **UI Library**: shadcn/ui
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Theming**: Next Themes (dark/light mode)
- **Real-Time Communication**: Socket.IO
- **Form Handling**: React Hook Form
- **Date/Time Picker**: React Datepicker
- **Icons**: Lucide Icons

---

## Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone hhttps://github.com/lakshaykhokhar2003/assignment8_frontend
   ```

2. **.env File**:
    - Create a `.env` file in the root directory.
        - Add the following environment variables:
          ```env
          NEXT_PUBLIC_API_URL=your_backend_url
          NEXT_PUBLIC_SOCKET_URL=your_backend_url
          ```   
        - Change NEXT_PUBLIC_SOCKET_URL to `wss://you_deployed_url.com` when deploying the app.
3. **Install dependencies**:
   ```bash
   yarn install
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
   
## License

MIT
