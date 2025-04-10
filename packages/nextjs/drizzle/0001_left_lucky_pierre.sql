ALTER TABLE "wallet_bindings" ADD CONSTRAINT "wallet_bindings_user_address_unique" UNIQUE("user_address");--> statement-breakpoint
ALTER TABLE "wallet_bindings" ADD CONSTRAINT "wallet_bindings_flowEDUAddress_unique" UNIQUE("flowEDUAddress");--> statement-breakpoint
ALTER TABLE "wallet_bindings" ADD CONSTRAINT "wallet_bindings_private_key_unique" UNIQUE("private_key");--> statement-breakpoint
ALTER TABLE "wallet_bindings" ADD CONSTRAINT "wallet_bindings_signature_unique" UNIQUE("signature");--> statement-breakpoint
ALTER TABLE "wallet_bindings" ADD CONSTRAINT "wallet_bindings_message_unique" UNIQUE("message");