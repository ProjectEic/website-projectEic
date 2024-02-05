
use std::fs;
use std::io::Write;
use std::io::copy;
use std::path::Path;
use reqwest::blocking::Client;
use zip::read::ZipArchive;

// for google forms interaction
use google_drive3::{
    GoogleForms, DefaultError, DefaultTokenResponse, Result,
    api::Form,
    auth::GoogleAuthenticator,
    types::{Date, DateTime, TimeOfDay},
};
use yup_oauth2::ServiceAccountAuthenticator;



// main fn => calls programm
fn main(){
    println!("init Programm");

    // get "create" new project 
    create_files_github();
}



fn create_files_github(){

    let project_url = "https://github.com/LucaSchirmer/Automated-Portfolio-creation/archive/master.zip"; 

    // current directory (./) where the .exe is executed + file name 
    let destination_path = "./project.zip";

    // Responsive of the zip.file
    let mut response = reqwest::blocking::get(project_url).expect("Request failed!");

    let mut zip_file = fs::File::create(Path::new(destination_path)).expect("File creation failed!");

    copy(&mut response, &mut zip_file).expect("Failed file write!");


    unzip_github_project(destination_path, "./");

    // Delete the .zip file after extraction
    if let Err(err) = fs::remove_file(destination_path) {
        eprintln!("Error deleting .zip file: {}", err);
    }
}



fn unzip_github_project(zip_file_path: &str, destination_folder_path: &str){

    // opening zip
    let zip_content = fs::File::open(zip_file_path).expect("File Opening failed!");    
    let mut archive = ZipArchive::new(zip_content).expect("ZIP archiving failed!");


    for i in 0..archive.len(){
        let mut file = archive.by_index(i).expect("Failed to get file from archive");
        let file_name = file.name();
        let file_path = format!("{}/{}", destination_folder_path, Path::new(file_name).display());

        // test if given index is a file or a directory
        if file.is_dir() {
            std::fs::create_dir_all(&file_path).expect("Folder creation failed!");
        } else {
            let mut output_file = fs::File::create(&file_path).expect("Failed to create file");
            std::io::copy(&mut file, &mut output_file).expect("Failed to extract file");
        }
    }

    // Close the ZIP archive file
    drop(archive);
}

fn download_file_from_firebase() -> Result<(), reqwest::Error> {


    let storage_url = "https://firebasestorage.googleapis.com/v0/b/YOUR-FIREBASE-APP.appspot.com/o/YOUR-PATH%2FTO%2FFILE.png";
    let firebase_api_key = "YOUR-FIREBASE-API-KEY";
    let output_file_path = "file_name.png"; // Change to the desired file path and name.

    download_file_from_firebase(storage_url, firebase_api_key, output_file_path)?;

    let client = reqwest::blocking::Client::new();

    let mut response = client
        .get(storage_url)
        .header(header::ACCEPT, "application/json")
        .query(&[("alt", "media"), ("token", firebase_api_key)])
        .send()?;

    if response.status().is_success() {
        let mut file = File::create(output_file_path)?;
        let mut content = Vec::new();
        response.copy_to(&mut content)?;
        file.write_all(&content)?;
        println!("File downloaded successfully to: {}", output_file_path);
    } else {
        println!("Failed to download file from Firebase: {:?}", response.status());
    }

    Ok(())
}