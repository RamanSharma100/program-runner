use std::env;

fn main() {
    println!("Hello from example.rs file!");
    match env::current_dir() {
        Ok(dir) => {
            if let Some(path) = dir.to_str() {
                println!("Current directory: {}", path);
            } else {
                eprintln!("Failed to convert current directory to string.");
            }
        }
        Err(e) => {
            eprintln!("Failed to get current directory: {}", e);
        }
    }
}