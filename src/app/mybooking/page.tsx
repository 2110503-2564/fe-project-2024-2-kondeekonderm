"use client";

import BookingList from "@/components/BookingList";

export default function CartPage() {
    return (
        <main className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-gray-900">Your Bookings</h1>
                    <p className="text-lg text-gray-600 mt-2">Manage and review your appointments below.</p>
                </header>

                {/* Booking List */}
                <section className="bg-white shadow-lg rounded-xl p-6">
                    <BookingList />
                </section>
            </div>
        </main>
    );
}
