import formatingDate from '../utils/formatingDate';

function DateDiv({ content, date }: { content: string; date: string }) {
  return (
    <span className="text-Link">
      {content} {formatingDate(date)}
    </span>
  );
}

export default DateDiv;
