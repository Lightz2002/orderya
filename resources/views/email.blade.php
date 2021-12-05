<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Invoice</title>
</head>
<style>
    #orders {
        font-family: Arial, Helvetica, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    #orders td, #orders th {
        border: 1px solid #ddd;
        padding: 8px;
    }

    #orders tr:nth-child(even){background-color: #f2f2f2;}

    #orders tr:hover {background-color: #ddd;}

    #orders th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #CD1007;
        color: white;
    }
</style>
<body>
    <h1>Invoice</h1>
    <p>To: {{ $email }}</p>
    <table id="orders">
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Serving Time</th>
            <th>Total</th>
        </tr>
        @foreach($order["order_items"] as $order_item)
            

            <tr>
                <td>{{ $order_item["foods"] ? $order_item["foods"]["name"] : $order_item["drinks"]["name"] }}</td>
               <td>{{ $order_item["quantity"] }}</td>
               <td>{{ $order_item["price"] }}</td>
               <td>{{ $order_item["foods"] ? $order_item["foods"]["serving_time"] : $order_item["drinks"]["serving_time"] }}</td>
               <td>{{ "Rp " . number_format($order_item["quantity"] * $order_item["price"],2,',','.')  }}</td>
            </tr>
        @endforeach
        
    </table>
    
    <p>Total 
       

        {{"Rp " . number_format(array_reduce($order["order_items"],  function ($total, $item) {
               $total += $item["quantity"] * $item["price"];
               return $total; 
        }),2,',','.')}}
    </p>   
</body>
</html>