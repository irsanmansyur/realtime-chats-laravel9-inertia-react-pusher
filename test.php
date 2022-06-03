<?php
$ruangans = ["Lemari", "Meja", "Kursi", "Jendela", "Kaca", "Meja", "Lemari", "Kipas", "Jendela"];
foreach (array_count_values($ruangans) as $ruang => $jumlah) {
    echo $ruang . " = " . $jumlah . "\n";
}
