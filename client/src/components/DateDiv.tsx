import formatingDate from '../utils/formatingDate';

function DateDiv({ content, date }: { content: string; date: string }) {
  return (
    <div className="text-Link text-right">
      {content} {formatingDate(date)}
    </div>
  );
}

export default DateDiv;
