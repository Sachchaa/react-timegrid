import type { Meta, StoryObj } from "@storybook/react-vite";
import { CalendarDate, CalendarDateTime } from "@internationalized/date";
import { Calendar } from "../src/components/calendar";
import type { CalendarEvent } from "../src/types";
import "../src/styles.css";

const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Team standup",
    start: new CalendarDateTime(2026, 4, 16, 9, 0),
    end: new CalendarDateTime(2026, 4, 16, 9, 30),
    color: "blue",
  },
  {
    id: "2",
    title: "Design review",
    start: new CalendarDateTime(2026, 4, 16, 11, 0),
    end: new CalendarDateTime(2026, 4, 16, 12, 0),
    color: "purple",
  },
  {
    id: "3",
    title: "Lunch with team",
    start: new CalendarDateTime(2026, 4, 16, 12, 30),
    end: new CalendarDateTime(2026, 4, 16, 13, 30),
    color: "green",
  },
  {
    id: "4",
    title: "Sprint planning",
    start: new CalendarDateTime(2026, 4, 17, 10, 0),
    end: new CalendarDateTime(2026, 4, 17, 11, 30),
    color: "orange",
  },
  {
    id: "5",
    title: "Conference",
    start: new CalendarDate(2026, 4, 20),
    end: new CalendarDate(2026, 4, 22),
    allDay: true,
    color: "red",
  },
  {
    id: "6",
    title: "1:1 with manager",
    start: new CalendarDateTime(2026, 4, 15, 14, 0),
    end: new CalendarDateTime(2026, 4, 15, 14, 30),
    color: "indigo",
  },
  {
    id: "7",
    title: "Product demo",
    start: new CalendarDateTime(2026, 4, 18, 15, 0),
    end: new CalendarDateTime(2026, 4, 18, 16, 0),
    color: "pink",
  },
  {
    id: "8",
    title: "Code review",
    start: new CalendarDateTime(2026, 4, 16, 14, 0),
    end: new CalendarDateTime(2026, 4, 16, 15, 0),
    color: "yellow",
  },
  {
    id: "9",
    title: "Overlapping meeting A",
    start: new CalendarDateTime(2026, 4, 16, 15, 0),
    end: new CalendarDateTime(2026, 4, 16, 16, 30),
    color: "blue",
  },
  {
    id: "10",
    title: "Overlapping meeting B",
    start: new CalendarDateTime(2026, 4, 16, 15, 30),
    end: new CalendarDateTime(2026, 4, 16, 17, 0),
    color: "red",
  },
];

const meta: Meta<typeof Calendar> = {
  title: "Calendar",
  component: Calendar,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    view: {
      control: "select",
      options: ["month", "week", "day"],
    },
    weekStartsOn: {
      control: "select",
      options: ["sunday", "monday"],
    },
    locale: {
      control: "select",
      options: ["en-US", "en-GB", "fr-FR", "de-DE", "ja-JP"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const MonthView: Story = {
  args: {
    defaultView: "month",
    defaultValue: new CalendarDate(2026, 4, 16),
    events: sampleEvents,
    locale: "en-US",
    weekStartsOn: "sunday",
    onEventClick: (event) => console.log("Event clicked:", event),
    onDateClick: (date) => console.log("Date clicked:", date.toString()),
  },
};

export const WeekView: Story = {
  args: {
    defaultView: "week",
    defaultValue: new CalendarDate(2026, 4, 16),
    events: sampleEvents,
    locale: "en-US",
    weekStartsOn: "sunday",
  },
};

export const DayView: Story = {
  args: {
    defaultView: "day",
    defaultValue: new CalendarDate(2026, 4, 16),
    events: sampleEvents,
    locale: "en-US",
    weekStartsOn: "sunday",
  },
};

export const MondayStart: Story = {
  args: {
    defaultView: "month",
    defaultValue: new CalendarDate(2026, 4, 16),
    events: sampleEvents,
    locale: "en-US",
    weekStartsOn: "monday",
  },
};

export const FrenchLocale: Story = {
  args: {
    defaultView: "month",
    defaultValue: new CalendarDate(2026, 4, 16),
    events: sampleEvents,
    locale: "fr-FR",
    weekStartsOn: "monday",
  },
};

export const EmptyCalendar: Story = {
  args: {
    defaultView: "month",
    defaultValue: new CalendarDate(2026, 4, 16),
    events: [],
    locale: "en-US",
    weekStartsOn: "sunday",
  },
};

export const MidnightEvent: Story = {
  args: {
    defaultView: "day",
    defaultValue: new CalendarDate(2026, 4, 16),
    events: [
      {
        id: "midnight-1",
        title: "Late night deploy",
        start: new CalendarDateTime(2026, 4, 16, 0, 0),
        end: new CalendarDateTime(2026, 4, 16, 1, 0),
        color: "indigo",
      },
      {
        id: "midnight-2",
        title: "On-call handoff",
        start: new CalendarDateTime(2026, 4, 16, 0, 30),
        end: new CalendarDateTime(2026, 4, 16, 1, 30),
        color: "red",
      },
    ],
    locale: "en-US",
    weekStartsOn: "sunday",
  },
};

export const DarkTheme: Story = {
  decorators: [
    (Story) => (
      <div className="dark bg-background p-4" style={{ colorScheme: "dark" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    defaultView: "week",
    defaultValue: new CalendarDate(2026, 4, 16),
    events: sampleEvents,
    locale: "en-US",
    weekStartsOn: "sunday",
  },
};

export const LongTitles: Story = {
  args: {
    defaultView: "week",
    defaultValue: new CalendarDate(2026, 4, 16),
    events: [
      {
        id: "long-1",
        title:
          "Quarterly business review with the entire product, design, and engineering leadership team",
        start: new CalendarDateTime(2026, 4, 16, 10, 0),
        end: new CalendarDateTime(2026, 4, 16, 12, 0),
        color: "purple",
      },
      {
        id: "long-2",
        title: "All-day company offsite — strategic planning",
        start: new CalendarDate(2026, 4, 17),
        end: new CalendarDate(2026, 4, 17),
        allDay: true,
        color: "orange",
      },
    ],
    locale: "en-US",
    weekStartsOn: "sunday",
  },
};

export const ColoredEvents: Story = {
  args: {
    defaultView: "week",
    defaultValue: new CalendarDate(2026, 4, 16),
    events: [
      {
        id: "color-1",
        title: "Named color (tomato)",
        start: new CalendarDateTime(2026, 4, 16, 9, 0),
        end: new CalendarDateTime(2026, 4, 16, 10, 0),
        color: "tomato",
      },
      {
        id: "color-2",
        title: "Hex color (#3b82f6)",
        start: new CalendarDateTime(2026, 4, 16, 10, 30),
        end: new CalendarDateTime(2026, 4, 16, 11, 30),
        color: "#3b82f6",
      },
      {
        id: "color-3",
        title: "rgb() color",
        start: new CalendarDateTime(2026, 4, 16, 12, 0),
        end: new CalendarDateTime(2026, 4, 16, 13, 0),
        color: "rgb(16, 185, 129)",
      },
      {
        id: "color-4",
        title: "hsl() color",
        start: new CalendarDateTime(2026, 4, 16, 14, 0),
        end: new CalendarDateTime(2026, 4, 16, 15, 0),
        color: "hsl(280, 70%, 55%)",
      },
      {
        id: "color-5",
        title: "Default (no color)",
        start: new CalendarDateTime(2026, 4, 16, 15, 30),
        end: new CalendarDateTime(2026, 4, 16, 16, 30),
      },
      {
        id: "color-6",
        title: "All-day colored event",
        start: new CalendarDate(2026, 4, 16),
        end: new CalendarDate(2026, 4, 16),
        allDay: true,
        color: "#f59e0b",
      },
    ],
    locale: "en-US",
    weekStartsOn: "sunday",
    onEventClick: (event) => console.log("Event clicked:", event),
  },
};

export const ManyEvents: Story = {
  args: {
    defaultView: "month",
    defaultValue: new CalendarDate(2026, 4, 16),
    events: [
      ...sampleEvents,
      {
        id: "11",
        title: "Extra event 1",
        start: new CalendarDateTime(2026, 4, 16, 8, 0),
        end: new CalendarDateTime(2026, 4, 16, 8, 30),
        color: "green",
      },
      {
        id: "12",
        title: "Extra event 2",
        start: new CalendarDateTime(2026, 4, 16, 17, 0),
        end: new CalendarDateTime(2026, 4, 16, 18, 0),
        color: "orange",
      },
    ],
    locale: "en-US",
    weekStartsOn: "sunday",
  },
};
