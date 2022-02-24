use anyhow::Result;
use std::{
    fs::{self, File},
    io::BufWriter,
};

fn main() -> Result<()> {
    let dbc_file = fs::read("../../resources/db/Model3CAN.dbc")?;
    let mut out = BufWriter::new(File::create("src/messages.rs")?);
    println!("cargo:rerun-if-changed=../../resources/db/Model3CAN.dbc");

    dbc_codegen::codegen("Model3CAN.dbc", &dbc_file, &mut out, true)?;
    Ok(())
}