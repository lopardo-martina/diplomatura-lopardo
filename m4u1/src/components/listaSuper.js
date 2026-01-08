export function ListaProdructos(props) {

    return (
        <div>
            <h2>Lista de Super</h2>
            <ul>
                {props.items.map(item => (
                    <li key={item.id}>
                        producto: {item.nombre} - precio: ${item.precio}
                    </li>
                ))}
            </ul>
        </div>
    );
}