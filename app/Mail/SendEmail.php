<?php



namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\OrderItem;
use App\Models\Transaction;
use App\Models\Order;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmail extends Mailable
{
    use Queueable, SerializesModels;

    private $email;
    private $order;

    public function __construct($email, $order_id)
    {
        $this->email = $email;
        $order = Order::where('id', $order_id)->first()->toJson();
        $this->order = json_decode($order, true);
        // dd($this->order);
    }

    public function build()
    {
        return $this->view('email', ['email' => $this->email, 'order' => $this->order]);
    }
}
