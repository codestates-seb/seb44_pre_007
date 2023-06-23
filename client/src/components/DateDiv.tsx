import formatingDate from '../utils/formatingDate';

function DateDiv({ content, date }: { content: string; date: string }) {
  return (
    <div className="text-Link">
      {content} {formatingDate(date)}
    </div>
  );
}

export default DateDiv;
