// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

extern crate native_dialog;

use std::process::Command;
use tauri::{Manager, Window};

use native_dialog::FileDialog;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
async fn close_splashscreen(window: Window) {
  // Close splashscreen
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }
  // Show main window
  window.get_window("main").unwrap().show().unwrap();
}

#[tauri::command]
fn choose_file() -> String {
    // Create a new file dialog.
    let path = FileDialog::new().show_open_single_file().unwrap();

    let path = match path {
        Some(path) => path
            .to_path_buf()
            .canonicalize()
            .unwrap()
            .to_string_lossy()
            .to_string(),
        None => return String::new(),
    };
    path
}

#[tauri::command]
fn show_file(file_path: String) {
    Command::new("explorer")
        .arg(file_path) // <- Specify the directory you'd like to open.
        .spawn()
        .unwrap();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            choose_file,
            show_file,
            close_splashscreen
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
