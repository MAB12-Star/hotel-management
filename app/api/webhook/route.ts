import { createBooking, updateHotelRoom } from "@/libs/apis";
import hotelRoom from "@/schemas/hotelRoom";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const checkout_session_completed = "checkout.session.completed";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2023-10-16',
})

export async function POST(req: Request, res: Response) {
    const reqBody = await req.text()
    const sig = req.headers.get("stripe-signature")
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    
    let event: Stripe.Event;

    try {
        if (!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);

    } catch (error: any){
        return new NextResponse(`Webhook Error ${error.message}`, {status:500});
    }

    //Loading Events
    switch (event.type) {
        case checkout_session_completed:
            const session = event.data.object;
    
            if (session.metadata) {
                const {
                    adults,
                    checkInDate,
                    checkOutDate,
                    children,
                    hotelRoom,
                    numberOfDays,
                    user,
                    discount,
                    totalPrice,
                } = session.metadata;
    
                try {
                    await createBooking({
                        adults: Number(adults),
                        checkInDate,
                        checkOutDate,
                        children: Number(children),
                        hotelRoom,
                        noOfDays: Number(numberOfDays),
                        discount: Number(discount),
                        totalPrice: Number(totalPrice),
                        user,
                    });
    
                    await updateHotelRoom(hotelRoom);
    
                    return NextResponse.json('Booking successful', {
                        status: 200,
                        statusText: 'Booking Successful',
                    });
                } catch (error) {
                    console.error('Error creating booking:', error);
                    // Handle the error appropriately
                }
            } else {
                console.error('Metadata is null for checkout session');
                // Handle the null metadata case appropriately
            }
            break;
    
        default:
            console.log(`Unhandled event type ${event.type}`);
            return NextResponse.json('Event Received', {
                status: 200,
                statusText: 'Event Received',
            });
    }
}