type FooterItemProps = {
  header: string;
  item: string[];
};

function ListItem({ header, item }: FooterItemProps) {
  return (
    <div className="pr-3 pb-6 grow shrink-0 text-footerText">
      <h5 className="font-bold mb-3 text-footerTitle"> {header} </h5>
      <ul>
        {item.map((name) => (
          <li key={`${name}`} className="py-1">{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListItem;
