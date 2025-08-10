"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		// Simulate API call
		setTimeout(() => {
			console.log("Subscribed with email:", email);
			setEmail("");
			setIsLoading(false);
		}, 1500);
	};

	return (
		<section className="bg-newsletter-light py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Find out more about Tradefund
					</h2>
					<p className="mt-4 text-lg leading-8 text-muted-foreground">
						Signup for our newsletter. sign up to receive the latest news,
						alerts and industry news.
					</p>
				</div>

				<form
					onSubmit={handleSubmit}
					className="mx-auto mt-10 max-w-md"
				>
					<div className="flex flex-col gap-4 sm:flex-row sm:gap-2">
						<div className="flex-1">
							<Input
								type="email"
								placeholder="Enter your email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="h-12 border-newsletter-accent/20 bg-background focus:border-newsletter focus:ring-newsletter/20"
								required
							/>
						</div>
						<Button
							type="submit"
							disabled={isLoading}
							className="h-12 rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							{isLoading ? "Subscribing..." : "Subscribe"}
						</Button>
					</div>

					<p className="mt-4 text-sm text-muted-foreground text-center">
						We respect your privacy. Unsubscribe at any time with one click.
					</p>
				</form>
			</div>
		</section>
	);
}
