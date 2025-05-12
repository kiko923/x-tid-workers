import { handleXMigration, ClientTransaction } from "x-client-transaction-id";

export default {
  async fetch(request) {
    try {
      const document = await handleXMigration();
      const transaction = await ClientTransaction.create(document);
      const transactionId = await transaction.generateTransactionId("GET", "/1.1/jot/client_event.json");

      return new Response(JSON.stringify({ transactionId }), {
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      return new Response("Error generating transaction ID: " + err.message, { status: 500 });
    }
  }
}
