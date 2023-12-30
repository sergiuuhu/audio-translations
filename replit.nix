{ pkgs }: {
  deps = [
    pkgs.ffmpeg.bin
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server  
  ];
}