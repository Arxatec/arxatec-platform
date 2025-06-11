import { useEffect, useRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";

export const Schedule = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const containerNav = useRef<HTMLDivElement | null>(null);
  const containerOffset = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (
      container.current != null &&
      containerNav.current != null &&
      containerOffset.current != null
    ) {
      const currentMinute = new Date().getHours() * 60;
      container.current.scrollTop =
        ((container.current.scrollHeight -
          containerNav.current.offsetHeight -
          containerOffset.current.offsetHeight) *
          currentMinute) /
        1440;
    }
  }, []);

  return (
    <div
      ref={container}
      className="flex flex-auto flex-col overflow-hidden bg-white shadow-sm rounded-lg hover:shadow-md h-full"
    >
      <Scrollbars autoHide>
        <div
          ref={containerNav}
          className="sticky top-0 z-10 grid flex-none grid-cols-7 bg-white text-xs text-gray-500 shadow ring-1 ring-black/5 md:hidden"
        >
          <button
            type="button"
            className="flex flex-col items-center pb-1.5 pt-3"
          >
            <span>W</span>
            {/* Default: "text-gray-900", Selected: "bg-gray-900 text-white", Today (Not Selected): "text-blue-600", Today (Selected): "bg-blue-600 text-white" */}
            <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
              19
            </span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center pb-1.5 pt-3"
          >
            <span>T</span>
            <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-blue-600">
              20
            </span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center pb-1.5 pt-3"
          >
            <span>F</span>
            <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
              21
            </span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center pb-1.5 pt-3"
          >
            <span>S</span>
            <span className="mt-3 flex size-8 items-center justify-center rounded-full bg-gray-900 text-base font-semibold text-white">
              22
            </span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center pb-1.5 pt-3"
          >
            <span>S</span>
            <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
              23
            </span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center pb-1.5 pt-3"
          >
            <span>M</span>
            <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
              24
            </span>
          </button>
          <button
            type="button"
            className="flex flex-col items-center pb-1.5 pt-3"
          >
            <span>T</span>
            <span className="mt-3 flex size-8 items-center justify-center rounded-full text-base font-semibold text-gray-900">
              25
            </span>
          </button>
        </div>
        <div className="flex w-full flex-auto">
          <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
          <div className="grid flex-auto grid-cols-1 grid-rows-1">
            {/* Horizontal lines */}
            <div
              className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
              style={{
                gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))",
              }}
            >
              <div ref={containerOffset} className="row-end-1 h-7"></div>
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  12AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  1AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  2AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  3AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  4AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  5AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  6AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  7AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  8AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  9AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  10AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  11AM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  12PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  1PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  2PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  3PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  4PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  5PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  6PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  7PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  8PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  9PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  10PM
                </div>
              </div>
              <div />
              <div>
                <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs/5 text-gray-400">
                  11PM
                </div>
              </div>
              <div />
            </div>

            {/* Events */}
            <ol
              className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
              style={{
                gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
              }}
            >
              <li
                className="relative mt-px flex"
                style={{ gridRow: "74 / span 12" }}
              >
                <a
                  href="#"
                  className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100"
                >
                  <p className="order-1 font-semibold text-blue-700">
                    Breakfast
                  </p>
                  <p className="text-blue-500 group-hover:text-blue-700">
                    <time dateTime="2022-01-22T06:00">6:00 AM</time>
                  </p>
                </a>
              </li>
              <li
                className="relative mt-px flex"
                style={{ gridRow: "92 / span 30" }}
              >
                <a
                  href="#"
                  className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs/5 hover:bg-pink-100"
                >
                  <p className="order-1 font-semibold text-pink-700">
                    Flight to Paris
                  </p>
                  <p className="order-1 text-pink-500 group-hover:text-pink-700">
                    John F. Kennedy International Airport
                  </p>
                  <p className="text-pink-500 group-hover:text-pink-700">
                    <time dateTime="2022-01-22T07:30">7:30 AM</time>
                  </p>
                </a>
              </li>
              <li
                className="relative mt-px flex"
                style={{ gridRow: "134 / span 18" }}
              >
                <a
                  href="#"
                  className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100"
                >
                  <p className="order-1 font-semibold text-blue-700">
                    Sightseeing
                  </p>
                  <p className="order-1 text-blue-500 group-hover:text-blue-700">
                    Eiffel Tower
                  </p>
                  <p className="text-blue-500 group-hover:text-blue-700">
                    <time dateTime="2022-01-22T11:00">11:00 AM</time>
                  </p>
                </a>
              </li>
            </ol>
          </div>
        </div>
      </Scrollbars>
    </div>
  );
};
