function CustomToolbar() {
  return (
    <div id="toolbar">
      <select className="ql-header">
        <option label="h1" value="1" />
        <option label="h2" value="2" />
      </select>
      <button aria-label="Save" type="button" className="ql-bold" />
      <button aria-label="Save" type="button" className="ql-italic" />
      <select className="ql-color" defaultValue="black">
        <option label="color_red" value="red" />
        <option label="color_green" value="green" />
        <option label="color_blue" value="blue" />
        <option label="color_orange" value="orange" />
        <option label="color_violet" value="violet" />
        <option label="color_gray" value="#d0d1d2" />
        <option label="color_black" />
      </select>
      <button aria-label="Save" type="button" className="ql-link" />
      <button aria-label="Save" type="button" className="ql-code-block" />
    </div>
  );
}

export default CustomToolbar;
