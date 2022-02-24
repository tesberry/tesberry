use futures_util::StreamExt;
use tokio;
use tokio_socketcan::CANSocket;


#[tokio::main]
async fn main() -> std::io::Result<()> {
    let mut socket_rx = CANSocket::open("vcan0").unwrap();

    // Parse dbc file into PgnLibrary
    let lib = PgnLibrary::from_dbc_file("../../resources/db/Model3CAN.dbc").unwrap();

    println!("Reading on vcan0");

    while let Some(next) = socket_rx.next().await {
        // Get Message Definition
        let def: &PgnDefinition = lib.get_pgn(next._id).unwrap();
        println!("{:#?}", def);
    }

    Ok(())
}
