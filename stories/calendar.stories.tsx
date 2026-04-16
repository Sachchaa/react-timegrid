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
