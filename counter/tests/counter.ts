/** @format */

import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { PublicKey } from "@solana/web3.js";

describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;

  const [counterPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("counter")],
    program.programId
  );

  it("Is initialized!", async () => {
    // Add your test here.
    const transactionSignature = await program.methods.initialize().rpc();

    const accountData = await program.account.counter.fetch(
      counterPDA
    );

    console.log(`Transaction Signature : ${transactionSignature}`);
    console.log(`Count: ${accountData.count}`);
  });

  it("increment", async () => {
    // Invoke the increment function
    const transactionSignature = await program.methods
      .increment()
      .rpc();

    const accountData = await program.account.counter.fetch(
      counterPDA
    );

    console.log(`Transaction Signature: ${transactionSignature}`);
    console.log(`Count: ${accountData.count}`);
  });
});
