// src/pages/DateTimeRangePickerDemo.tsx - Demo page for DateTime Range Picker
import React, { useState } from "react";
import dayjs from "dayjs";
import DateTimeRangePicker, {
  DateTimeRange,
} from "../components/ui/DateTimeRangePicker";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const DateTimeRangePickerDemo: React.FC = () => {
  const [basicRange, setBasicRange] = useState<DateTimeRange>({
    startDate: null,
    endDate: null,
  });

  const [customRange, setCustomRange] = useState<DateTimeRange>({
    startDate: dayjs().hour(9).minute(0),
    endDate: dayjs().add(7, "days").hour(17).minute(0),
  });

  const [restrictedRange, setRestrictedRange] = useState<DateTimeRange>({
    startDate: null,
    endDate: null,
  });

  const [timeOnlyRange, setTimeOnlyRange] = useState<DateTimeRange>({
    startDate: null,
    endDate: null,
  });

  const [format24hRange, setFormat24hRange] = useState<DateTimeRange>({
    startDate: null,
    endDate: null,
  });

  const handleClearRange = (
    setter: React.Dispatch<React.SetStateAction<DateTimeRange>>
  ) => {
    setter({ startDate: null, endDate: null });
  };

  return (
    <div className="space-y-xl">
      <div>
        <h1 className="text-heading-1 text-text-primary mb-md">
          DateTime Range Picker Demo
        </h1>
        <p className="text-body text-text-secondary">
          Custom DateTime Range Picker component with calendar, time selection,
          and various configuration options.
        </p>
      </div>

      {/* Basic Usage */}
      <Card>
        <Card.Header>
          <h2 className="text-heading-2 text-text-primary">Basic Usage</h2>
          <p className="text-body-small text-text-secondary mt-sm">
            Default date-time range picker with standard functionality.
          </p>
        </Card.Header>
        <Card.Body>
          <div className="space-y-lg">
            <DateTimeRangePicker
              label="Select Date Range"
              value={basicRange}
              onChange={setBasicRange}
              placeholder="MM/DD/YYYY hh:mm aa – MM/DD/YYYY hh:mm aa"
            />

            <div className="flex space-x-md">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleClearRange(setBasicRange)}
              >
                Clear
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  setBasicRange({
                    startDate: dayjs(),
                    endDate: dayjs().add(1, "week"),
                  })
                }
              >
                Set This Week
              </Button>
            </div>

            <div className="p-md bg-theme-tertiary rounded-md">
              <h4 className="text-body font-medium text-text-primary mb-sm">
                Selected Range:
              </h4>
              <pre className="text-body-small text-text-secondary">
                {JSON.stringify(
                  {
                    startDate:
                      basicRange.startDate?.format("YYYY-MM-DD HH:mm") || null,
                    endDate:
                      basicRange.endDate?.format("YYYY-MM-DD HH:mm") || null,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Pre-filled Values */}
      <Card>
        <Card.Header>
          <h2 className="text-heading-2 text-text-primary">
            Pre-filled Values
          </h2>
          <p className="text-body-small text-text-secondary mt-sm">
            DateTime picker with initial values set.
          </p>
        </Card.Header>
        <Card.Body>
          <div className="space-y-lg">
            <DateTimeRangePicker
              label="Business Hours This Week"
              value={customRange}
              onChange={setCustomRange}
            />

            <div className="p-md bg-theme-tertiary rounded-md">
              <h4 className="text-body font-medium text-text-primary mb-sm">
                Selected Range:
              </h4>
              <p className="text-body-small text-text-secondary">
                <strong>Start:</strong>{" "}
                {customRange.startDate?.format(
                  "dddd, MMMM D, YYYY [at] h:mm A"
                ) || "Not selected"}
              </p>
              <p className="text-body-small text-text-secondary">
                <strong>End:</strong>{" "}
                {customRange.endDate?.format(
                  "dddd, MMMM D, YYYY [at] h:mm A"
                ) || "Not selected"}
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Restricted Dates */}
      <Card>
        <Card.Header>
          <h2 className="text-heading-2 text-text-primary">
            Date Restrictions
          </h2>
          <p className="text-body-small text-text-secondary mt-sm">
            Disable past dates and set date range limits.
          </p>
        </Card.Header>
        <Card.Body>
          <div className="space-y-lg">
            <DateTimeRangePicker
              label="Future Dates Only"
              value={restrictedRange}
              onChange={setRestrictedRange}
              disablePastDates={true}
              minDate={dayjs()}
              maxDate={dayjs().add(3, "months")}
              placeholder="Select future dates only..."
            />

            <div className="p-md bg-warning-50 border border-warning-200 rounded-md">
              <p className="text-body-small text-warning-700">
                <strong>Restrictions:</strong> Past dates are disabled, and you
                can only select dates up to 3 months in the future.
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Different Formats */}
      <Card>
        <Card.Header>
          <h2 className="text-heading-2 text-text-primary">Custom Formats</h2>
          <p className="text-body-small text-text-secondary mt-sm">
            Different date formats and time display options.
          </p>
        </Card.Header>
        <Card.Body>
          <div className="space-y-lg">
            {/* 24-hour format */}
            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                24-Hour Format
              </h3>
              <DateTimeRangePicker
                label="Event Duration (24h)"
                value={format24hRange}
                onChange={setFormat24hRange}
                format="DD/MM/YYYY HH:mm"
                placeholder="DD/MM/YYYY HH:mm – DD/MM/YYYY HH:mm"
                use24HourFormat={true}
              />
            </div>

            {/* Date only */}
            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                Date Only
              </h3>
              <DateTimeRangePicker
                label="Date Range (No Time)"
                value={timeOnlyRange}
                onChange={setTimeOnlyRange}
                format="YYYY-MM-DD"
                placeholder="YYYY-MM-DD – YYYY-MM-DD"
                showTime={false}
              />
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Error States */}
      <Card>
        <Card.Header>
          <h2 className="text-heading-2 text-text-primary">Form States</h2>
          <p className="text-body-small text-text-secondary mt-sm">
            Error states, disabled state, and required field examples.
          </p>
        </Card.Header>
        <Card.Body>
          <div className="space-y-lg">
            <DateTimeRangePicker
              label="Required Field"
              placeholder="This field is required..."
              required={true}
              error="Please select a valid date range"
            />

            <DateTimeRangePicker
              label="Disabled Field"
              placeholder="This field is disabled..."
              disabled={true}
              value={{
                startDate: dayjs("2024-01-01"),
                endDate: dayjs("2024-01-31"),
              }}
            />
          </div>
        </Card.Body>
      </Card>

      {/* Advanced Usage */}
      <Card>
        <Card.Header>
          <h2 className="text-heading-2 text-text-primary">Code Examples</h2>
        </Card.Header>
        <Card.Body>
          <div className="space-y-lg">
            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                Basic Usage
              </h3>
              <pre className="bg-theme-tertiary p-md rounded-md text-caption text-text-secondary overflow-auto">
                {`import DateTimeRangePicker, { DateTimeRange } from '../components/ui/DateTimeRangePicker';
import dayjs from 'dayjs';

const [range, setRange] = useState<DateTimeRange>({
  startDate: null,
  endDate: null
});

<DateTimeRangePicker
  label="Select Date Range"
  value={range}
  onChange={setRange}
  placeholder="MM/DD/YYYY hh:mm aa – MM/DD/YYYY hh:mm aa"
/>`}
              </pre>
            </div>

            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                With Restrictions
              </h3>
              <pre className="bg-theme-tertiary p-md rounded-md text-caption text-text-secondary overflow-auto">
                {`<DateTimeRangePicker
  label="Future Events Only"
  value={range}
  onChange={setRange}
  disablePastDates={true}
  minDate={dayjs()}
  maxDate={dayjs().add(1, 'year')}
  required={true}
/>`}
              </pre>
            </div>

            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                Custom Format
              </h3>
              <pre className="bg-theme-tertiary p-md rounded-md text-caption text-text-secondary overflow-auto">
                {`<DateTimeRangePicker
  label="European Format"
  value={range}
  onChange={setRange}
  format="DD/MM/YYYY HH:mm"
  placeholder="DD/MM/YYYY HH:mm – DD/MM/YYYY HH:mm"
  use24HourFormat={true}
/>`}
              </pre>
            </div>

            <div>
              <h3 className="text-heading-3 text-text-primary mb-md">
                Date Only
              </h3>
              <pre className="bg-theme-tertiary p-md rounded-md text-caption text-text-secondary overflow-auto">
                {`<DateTimeRangePicker
  label="Date Range Only"
  value={range}
  onChange={setRange}
  format="YYYY-MM-DD"
  placeholder="YYYY-MM-DD – YYYY-MM-DD"
  showTime={false}
/>`}
              </pre>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Props Reference */}
      <Card>
        <Card.Header>
          <h2 className="text-heading-2 text-text-primary">Props Reference</h2>
        </Card.Header>
        <Card.Body>
          <div className="overflow-x-auto">
            <table className="w-full text-body-small">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="text-left py-2 pr-4 font-medium text-text-primary">
                    Prop
                  </th>
                  <th className="text-left py-2 pr-4 font-medium text-text-primary">
                    Type
                  </th>
                  <th className="text-left py-2 pr-4 font-medium text-text-primary">
                    Default
                  </th>
                  <th className="text-left py-2 font-medium text-text-primary">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-mono">value</td>
                  <td className="py-2 pr-4">DateTimeRange</td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Current selected range</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-mono">onChange</td>
                  <td className="py-2 pr-4">function</td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Callback when range changes</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-mono">placeholder</td>
                  <td className="py-2 pr-4">string</td>
                  <td className="py-2 pr-4">
                    MM/DD/YYYY hh:mm aa – MM/DD/YYYY hh:mm aa
                  </td>
                  <td className="py-2">Input placeholder text</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-mono">format</td>
                  <td className="py-2 pr-4">string</td>
                  <td className="py-2 pr-4">MM/DD/YYYY hh:mm A</td>
                  <td className="py-2">Date format string</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-mono">disablePastDates</td>
                  <td className="py-2 pr-4">boolean</td>
                  <td className="py-2 pr-4">false</td>
                  <td className="py-2">Disable past dates</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-mono">showTime</td>
                  <td className="py-2 pr-4">boolean</td>
                  <td className="py-2 pr-4">true</td>
                  <td className="py-2">Show time picker</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-mono">use24HourFormat</td>
                  <td className="py-2 pr-4">boolean</td>
                  <td className="py-2 pr-4">false</td>
                  <td className="py-2">Use 24-hour time format</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-mono">minDate</td>
                  <td className="py-2 pr-4">Dayjs</td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Minimum selectable date</td>
                </tr>
                <tr className="border-b border-border-light">
                  <td className="py-2 pr-4 font-mono">maxDate</td>
                  <td className="py-2 pr-4">Dayjs</td>
                  <td className="py-2 pr-4">-</td>
                  <td className="py-2">Maximum selectable date</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono">disabled</td>
                  <td className="py-2 pr-4">boolean</td>
                  <td className="py-2 pr-4">false</td>
                  <td className="py-2">Disable the component</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DateTimeRangePickerDemo;
