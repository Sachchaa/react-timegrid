import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "../src/components/error-boundary";

function Boom(): never {
  throw new Error("kaboom");
}

describe("ErrorBoundary", () => {
  it("renders children normally", () => {
    render(
      <ErrorBoundary>
        <p>ok</p>
      </ErrorBoundary>
    );
    expect(screen.getByText("ok")).toBeInTheDocument();
  });

  it("renders the default fallback when a child throws", () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
    expect(screen.getByRole("alert")).toHaveTextContent("kaboom");
    err.mockRestore();
  });

  it("renders a custom fallback when provided", () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={<p>custom fallback</p>}>
        <Boom />
      </ErrorBoundary>
    );
    expect(screen.getByText("custom fallback")).toBeInTheDocument();
    err.mockRestore();
  });

  it("calls onError when a child throws", () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <Boom />
      </ErrorBoundary>
    );
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
    err.mockRestore();
  });
});
