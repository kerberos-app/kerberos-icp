import Principal "mo:base/Principal";

actor {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
  
  public shared(msg) func whoami() : async Text {
    let caller = msg.caller;
    return Principal.toText(caller);
  };
};