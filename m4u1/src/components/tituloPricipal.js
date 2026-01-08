export function TituloPrincipal(props) {

    return (
        <header style= {{ backgroundColor: '#c2c2c2ff',
            padding: '20px'}}>
            <h1>{props.titulo}</h1>
        </header>
    );
}