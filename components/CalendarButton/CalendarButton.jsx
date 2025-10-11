export default function CalendarButton({ recipe }) {
  function addToCalendar() {
    const title = encodeURIComponent(recipe.title);
    const details = encodeURIComponent(recipe.sourceUrl || "");
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
    window.open(url, "_blank");
  }

  return <button onClick={addToCalendar}>Add to Calendar</button>;
}
