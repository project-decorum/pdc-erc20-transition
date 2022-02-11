{
  outputs = { self, nixpkgs }@inputs:
    let
      system = "x86_64-linux";
      pkgs = inputs.nixpkgs.legacyPackages.${system};
    in
  {
    devShell.${system} = pkgs.mkShell {
      buildInputs = with pkgs; [ nodejs-12_x python2 nodePackages.node-gyp ];
    };
  };
}
